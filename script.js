const gameInfo=document.querySelector(".gameInfo");
const boxes=document.querySelectorAll('.box');
const btn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// initialize the game

let initGame=()=>{
    currentPlayer="X";
    gameInfo.innerText="Current Player - "+currentPlayer;
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // initailize to org state
        box.classList=`box box${index+1}` ;
    });
    btn.classList.remove('active');
};

initGame();

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap the turn
        swapTurn();
        // check whether game is end
        checkGameOver();
    }
}

function swapTurn()
{
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else
        currentPlayer="X";
    
    // update in UI
    gameInfo.innerText=`Current Player- ${currentPlayer}`;
}

//  event for box
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

// new game button logic

btn.addEventListener("click",initGame);

function checkGameOver()
{
    let ans="";
    winningPositions.forEach((pos)=>{
        // box should't be empty & value should be same 
        if( (gameGrid[pos[0]]!=="" || gameGrid[pos[1]]!=="" || gameGrid[pos[2]]!=="") && (gameGrid[pos[0]] === gameGrid[pos[1]]) && (gameGrid[pos[1]] === gameGrid[pos[2]]))
        {
            //  if winner is X
            if(gameGrid[pos[0]]==="X")
                ans="X";
            else   
                ans="0"     // winner is 0
            
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            
            
            // display the color
            for(let i=0;i<3;i++)    
                boxes[pos[i]].classList.add('win');

            // boxes[pos[0]].classList.add("win");
            // boxes[pos[1]].classList.add("win");
            // boxes[pos[2]].classList.add("win");
        }

        if(ans!=="")
        {
            // show the winner 
            gameInfo.innerText="Winnner Player - "+ans;
            // visible new game button
            btn.classList.add('active');
            // invisble green color;
            return; 
        }

        // if game is tie
        let fillCnt=0;
        gameGrid.forEach((box)=>{
            if(box!=="")
                fillCnt++;
        })

        if(fillCnt===9)
        {
            gameInfo.innerText="Game Tied!";
            btn.classList.add('active');
        }
    })
}