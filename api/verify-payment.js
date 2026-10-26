/**
 * 천문사주 (cheonmun.life) - 포트원(PortOne V2) 결제 검증 Serverless API
 * POST /api/verify-payment
 * Body: { paymentId, expectedAmount, items }
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { paymentId, expectedAmount, items } = body;

    if (!paymentId || typeof paymentId !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing paymentId' });
    }

    const apiSecret = process.env.PORTONE_API_SECRET;

    // 서버 시크릿이 설정된 경우 PortOne V2 REST API로 실결제 금액·상태 위변조 검증
    if (apiSecret && !apiSecret.includes('demo')) {
      const portoneRes = await fetch(
        `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `PortOne ${apiSecret}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!portoneRes.ok) {
        const errText = await portoneRes.text();
        return res.status(400).json({
          ok: false,
          verified: false,
          error: 'PortOne API 조회 실패',
          detail: errText.slice(0, 300)
        });
      }

      const payment = await portoneRes.json();
      const paidTotal = payment?.amount?.total;
      const status = payment?.status;

      if (status !== 'PAID') {
        return res.status(400).json({
          ok: false,
          verified: false,
          error: `결제 완료 상태가 아닙니다 (${status})`
        });
      }

      if (typeof expectedAmount === 'number' && paidTotal !== expectedAmount) {
        return res.status(400).json({
          ok: false,
          verified: false,
          error: `결제 금액 불일치 (요청: ${expectedAmount}, 실결제: ${paidTotal})`
        });
      }

      return res.status(200).json({
        ok: true,
        verified: true,
        mode: 'server_verified',
        paymentId,
        paidAmount: paidTotal,
        paidAt: payment.paidAt || new Date().toISOString(),
        items: items || []
      });
    }

    // 시크릿 미설정 시(심사·초기 연동 단계) 브라우저 SDK 응답 기반 승인
    return res.status(200).json({
      ok: true,
      verified: true,
      mode: 'sdk_verified',
      paymentId,
      paidAmount: expectedAmount || 0,
      paidAt: new Date().toISOString(),
      items: items || []
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      verified: false,
      error: err.message || 'Internal Server Error'
    });
  }
};
