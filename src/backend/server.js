const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: "09ab05fae85f59fa2e3d8012f945c36a-b0ed5083-a794a76c",
    domain: "sandboxae91ab1ec7c44a1299f127d11b517984.mailgun.org",
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
  const { email, subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'moviePicker <moviepickermail@gmail.com>',
        to: `${email}`,
        subject: `${subject}`,
        html: `<p>${message}</p>`,
      },
      (error, body) => {
        if (error) {
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

const port = 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});