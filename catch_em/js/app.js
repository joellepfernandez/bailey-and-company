      ///////////Variables//////////
  var animationIntervalId;
  var game = {
      player: {
          name: currentPlayerName,
          score: 0
      }
  }
  var timeLimit = 60
  var currentPlayer = game.player2
  var theH1 = document.getElementById('the-time')
  var theTime = theH1.innerText
  var StartButton = $('#fire')
  var CheckButton = $('#check-for-winner')
  var RestartButton = $('#restart')
  var currentPlayerDisplay = $('.current-player-display')
  var currentPlayerName = $('input').val() //input value
  var scoreList = $('#score-list')
  var scoreHistory = $('#score-history')
  var scores = []
      ///////////Buttons//////////
  StartButton.on('click', startTimer) //click on the start button to begin timer
  CheckButton.on('click', checkForWinner) //click on check button to check for winner
  RestartButton.on('click', function() {document.location.reload(true)}) //click on restart button to reload

  function startTimer() {
      saveCurrentPlayer()
      countDownIntervalId = setInterval(countDown, 1000) //timer counts down by second
      clearGameBoard() // clearGameBoard()
      addItems()
      // switchTurns() //when the clear button is clicked the turns are switched
      $('body').on('click', '.object', function() { //click listener on good item
          $(this).remove() //remove good item
          if ($(this).hasClass('good')) {
              game.player.score += 1
          } else {
              game.player.score -= 2
          }
          $('#current_score').html(game.player.score) //add 1 point to score
      })
  }

  function countDown() {
      if (theTime > 0) { //if the timer is greater than 0 continue subtracting 1 second
          theTime = theTime - 1
      } else {
          clearInterval(animationIntervalId) //if the timer is 0 stop the animation
          clearInterval(countDownIntervalId)
          $('body').off('click', '.object') // if the timer is 0 turn off scoring ability
          scoreHistory.append('<div id="score-list"></div>') //adds score history
          $('#score-list').append('<p data-score="' + game.player.score + '"><span class="player-name">' + currentPlayerName + "</span>: " + game.player.score + '</p>') // add the current player's score to Score History
          scores.push({ //adds current player's name and score
              name: currentPlayerName,
              score: +$('#score-list p').last().data('score')
          })
          theTime = timeLimit //says time limit is up
          $('input').val('') //clears inpu
          game.player.score = 0 //makes scores 0
          $('#current_score').html(game.player.score)
      }
      theH1.innerHTML = theTime
  }

  ///////////animation//////////
  var theGame = $('#game') //theGame area
  var imgs = ['<div class="good object"><img src="./images/dog-treat.png"/></div>', '<div class="bad object"><img src="./images/chocolate.png"/></div>', '<div class="bad object"><img src="./images/grapes.png"/></div>', '<div class="good object"><img src="./images/kong.png"/></div>', '<div class="bad object"><img src="./images/poop.png"/></div>', '<div class="good object"><img src="./images/tennis-ball.png"/></div>', '<div class="good object"><img src="./images/carrot.png"/></div>', '<div class="bad object"><img src="./images/beer.png"/></div>', '<div class="good object"><img src="./images/strawberry.png"/></div>', '<div class="good object"><img src="./images/blueberry.png"/></div>', '<div class="bad object"><img src="./images/tomato.png"/></div>', '<div class="bad object"><img src="./images/mushroom.png"/></div>', '<div class="good object"><img src="./images/spinach.png"/></div>'] //images

  function DogItem(div) {
      theGame.append(div)
      var thisItem = $('#game div').last() //affects the last item made
      thisItem.css({ //randomly changes the css
          top: genRandomNum(50, theGame.height()),
          left: genRandomNum(50, theGame.width()),
      })
      thisItem.animate({ //randomly animates item
          top: genRandomNum(50, theGame.height()),
          left: genRandomNum(50, theGame.width()),
      }, 1000)
  }

  function addItems() { //creates a new item ever second
      var newDogItem = setInterval(makeItem, 500)
      animationIntervalId = newDogItem
      function makeItem(e) {
          new DogItem(imgs[Math.floor(Math.random() * (imgs.length))]) //chooses item base on randomly generated index
          console.log(e)
      }
  }

  function genRandomNum(min, max) { //random number generator
      return Math.round((Math.random() * (max - min)) + min - 50)
  }

  function clearGameBoard() { //clears game board
      theGame.html('')
  }

  function saveCurrentPlayer() { //saves the current player
      currentPlayerName = $('input').val()
  }

  function checkForWinner() { //sorts players' scores from high to low
      scores.sort(function(a, b) {
          return b.score - a.score
      })
      // after sorting by top score first, low score last, make an array of all players that also got the top score:
      var firstPlacePlayers = scores.filter(function(el) {
          return el.score == scores[0].score
      })
      // empty the score list container:
      scoreHistory.empty()
      // add a message declaring the top score;
      scoreHistory.append('<h1>Top Score: ' + firstPlacePlayers[0].score + '</h1>')
      // go through firstPlacePlayers and for each one, add the name to the list:
      firstPlacePlayers.forEach(function(player) {
          scoreHistory.append('<h3>' + player.name + '</h3>')
      })
  }
