const gameTable=document.getElementById("gameTable");
const resultBar=document.querySelector("#result h2");
const resultDiv=document.querySelector("#result");
const closeButton=document.querySelector("#close");
const gameSpace=document.getElementById("gameSpace");
const playerName=document.getElementById("playerName");
var gameParameters={
    user:0,
    move:0,
    play:true
}

closeButton.addEventListener("click",function(){
    resultDiv.style.display="none";
    gameSpace.style.filter="";
    canvas.style.filter="";
    gameParameters.play=true;
})


function check(row,col)
{
    let flag=false;
    let desiredPattern=(gameParameters.user)?"OOO":"XXX";
    let pattern="";
    for(let i=0;i<3;i++)
    {
        pattern+=gameTable.children[0].children[row].children[i].textContent;
    }
    
    if(desiredPattern === pattern)
    {
        return true;
    }
    pattern="";
    for(let i=0;i<3;i++)
    {
        pattern+=gameTable.children[0].children[i].children[col].textContent;
    }
    
    if(desiredPattern === pattern)
    {
        return true;
    }
    pattern="";
    if(row==col)
    {
        for(let i=0;i<3;i++)
        {
            pattern+=gameTable.children[0].children[i].children[i].textContent;
        }
        if(desiredPattern===pattern)
            return true;
    }
    pattern="";
    if(row + col == 2)
    {
        for(let i=0;i<3;i++)
        {
            pattern+=gameTable.children[0].children[i].children[2-i].textContent;
        }
        if(pattern === desiredPattern)
            return true;
    }
    return false;
}
function clearTable()
{
    const cells=document.querySelectorAll("td");
    for(let i=0;i<cells.length;i++)
        cells[i].textContent=" ";
}
function showResult(winner)
{
    if(winner == null)
    {
        resultBar.textContent="Game Draw";
    }
    else 
    {
        let win=(winner==0)?"X":"O";
        resultBar.textContent="Game Over " + win + " won!";
    }
    gameParameters.play=false;
    resultDiv.style.display="block";
    gameSpace.style.filter="blur(6px)";
    canvas.style.filter="blur(6px)";
}
function alert()
{
    gameParameters.play=false;
    resultBar.textContent="Cell already occupied. Click Another Cell";
    resultDiv.style.display="block";
    gameSpace.style.filter="blur(6px)";
    canvas.style.filter="blur(6px)";
}
function clicked(row,col)
{
    if(gameParameters.play === false)
        return;
    let curr=(gameParameters.user==1)?'O':'X';
    const selectedCell=gameTable.children[0].children[row].children[col];
    if(selectedCell.textContent!= " ")
    {
        alert();
        return;
    }
    selectedCell.textContent=curr;
    
    if(!check(row,col))
    {
        gameParameters.move++;
        gameParameters.user+=1;gameParameters.user%=2;
    }
    else
    {
        showResult(gameParameters.user);
        gameParameters.user=0;
        gameParameters.move=0;
        clearTable();
    }
    if(gameParameters.move === 9)
    {
        showResult(null);
        gameParameters.user=0;
        gameParameters.move=0;
        clearTable();
    }
    curr=(gameParameters.user==1)?'O':'X';
    playerName.textContent=curr;
}   
