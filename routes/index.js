var express = require('express');
var router = express.Router();
const { Winners } = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    payload: "Welcome. Read the Docs before starting",
    err: false
  })
});

router.get('/6', function (req, res, next) {
  res.status(418).send(`
    <html>
      <body style="max-width: 728px; margin: 0 auto;" >
        <img style="display: block; margin: 0 auto" src="https://media.giphy.com/media/1xkbYuiMIVCJRBYBca/giphy.gif" />
        <pre>
        {
          payload: "You will want to try a POST request here. Also switch to \`Preview\` instead of \`Pretty\` to render this HTML"
          err: false
        }
        </pre>
      <body>
    <html>
    `)
});

router.post('/6', async (req, res, next) => {
  let { username } = req.body
  let filteredFields = Object.keys(req.body).filter(field => field !== "username").map(f => `'${f}'`);

  if (filteredFields.length && !username) {
    return res.status(400).send(`
      <html>
        <body style="max-width: 728px; margin: 0 auto;" >
        <img style="display: block; margin: 0 auto" src="https://media.giphy.com/media/3o7bu6Qs4WE8ZRinDi/giphy.gif" alt="no no no" />
        <pre>
          {
            payload: {
              msg: "Unexpected field(s): ${filteredFields.join(', ')}.",
              hint: "How does this API identify its users?"
            },
            err: true 

          }
        </pre>
        <img style="display: block; margin: 0 auto"src="https://media.giphy.com/media/co7KFI57yaXIY/giphy.gif" alt="who are you?" />
        </body>
      </html>
    `)
  }

  if (!username) {
    return res.status(400).send(`
      <html>
        <body style="max-width: 728px; margin: 0 auto;" >
        <img style="display: block; margin: 0 auto" src="https://media.giphy.com/media/fnuSiwXMTV3zmYDf6k/giphy.gif" alt="who are you?" />
        <pre>
          {
            payload: {
              msg: "Who is the lucky one? Tell me.",
            },
            err: true 

          }
        </pre>
        </body>
      </html> 
    `)
  }

  try {
    let newWinner = await Winners.enterWinner(username);
    if (!newWinner) {
      return res.status(409).send(`
        <html>
          <body style="max-width: 728px; margin: 0 auto" >
            <img style="display: block; margin: 0 auto" src="https://media.giphy.com/media/XtUPfbJIltIaY/giphy.gif" alt="man raising beer" />
            <pre>
            {
              payload: {
                msg: "${username}, you already won!!",
              },
              err: true
            }
            </pre>
          </body>
        </html>
      `)
    }
    res.status(420).send(`
      <html>
        <body style="max-width: 728px; margin: 0 auto" >
          <img style="display: block; margin: 0 auto" src="https://media.giphy.com/media/qi8Yhj4pKcIec/giphy.gif" alt="raining cash" />
          <pre>
          {
            payload: {
              msg: "Congrats ${username}, you have found the easter egg!! Amazing!! ",
              side_note: "If you are the first to find it you have won the amount bellow"
              amount_won: 10,
              currency: "USD"
            }
          }
          <img style="display: block; margin: 0 auto"src="https://media.giphy.com/media/95ZYXmOCd9BBK/giphy.gif" alt="raining cash" />
          </pre>
        </body>
      </html>
    `)
  } catch (err) {
    return next(err)
  }

});

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: `Oops! ${req.method} method is is not allowed here`,
    err: true
  })
})

module.exports = router;
