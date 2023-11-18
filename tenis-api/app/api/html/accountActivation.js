const activateAccountBody = (token) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TT Tennis Tournaments</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      padding: 20px;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .logo {
      width: 100px;
      height: auto;
    }
    .slogan {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      background-color: #007BFF;
      color: #fff;
      border: none;
      border-radius: 25px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TT Tenis Tournaments</h1>
    <p class="slogan">Join to different tournaments</p>

    <p>
      Join us by activating your account.
    </p>
    <p>Contact us at <a href="mailto:info@classnexus.com">info@classnexus.com</a> for more information.</p>
    <a href="${process.env.WEB_URL}/activate/${token}" class="button">Activate Your Account</a>
  </div>
</body>
</html>
`;

export default activateAccountBody;
