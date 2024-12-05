import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '488510538109-36i4ol70jivfrtcu31upbmld812klgr7.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

export default async function handler(req, res) {
  const { oldRefreshToken } = req.body;
  if (oldRefreshToken.length > 0) {
    const refreshedTokens = [];
    for (let i = 0; i < oldRefreshToken.length; i++) {
      const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
      if(oldRefreshToken[i].access_token !== null){
        try {
          const newTokens = await client.refreshToken(oldRefreshToken[i].access_token);
          refreshedTokens.push({
            access_token: newTokens.tokens.access_token,
            student_id: oldRefreshToken[i].student_id
          });
        } catch (error) {
          console.error('Error refreshing token:', error);
          return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
          });
        }
      }

    }
    // Send response after all tokens have been refreshed
    return res.status(200).json({
      success: true,
      code: 200,
      data: refreshedTokens
    });
  } else {
    // Handle case when there are no tokens to refresh
    return res.status(400).json({
      success: false,
      code: 400,
      message: 'No refresh tokens provided in the request body'
    });
  }
}
