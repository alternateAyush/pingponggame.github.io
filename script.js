var ball = document.getElementById("ball")
var autoplayBtn = document.getElementById("autoplay")
var player1 = document.getElementById("player1")
var player2 = document.getElementById("player2")
var balls = document.getElementsByClassName("balls");
var boundry= document.getElementById("boundry")
var ballhit= document.getElementById("ballhit")
var ballmiss= document.getElementById("ballmiss")
var ballbounce= document.getElementById("ballbounce")
var play= document.getElementById("play")
var scoreP1= document.getElementById("score-p1")
var scoreP2= document.getElementById("score-p2")
var wWidth = Math.floor((window.innerWidth-27)/2);
var wHeight = Math.floor((window.innerHeight-27)/2);
var autoplay=false;
ball.style.top = wHeight+"px";
ball.style.left = wWidth+"px";

player1.style.left = (wWidth-60)+"px";
player2.style.left = (wWidth-60)+"px";
wHeight = window.innerHeight;
wWidth = window.innerWidth;

function collision1()
{
    var b = ball.getBoundingClientRect();
    var p1 = player1.getBoundingClientRect();
    if(p1.y+p1.height>=b.y && p1.y <= b.y+b.height)
    {
        if(p1.x+p1.width>=b.x && p1.x<=b.x+b.width){ return true;}
       
    }
    return false;
}
function collision2()
{
    var b = ball.getBoundingClientRect();
    var p2 = player2.getBoundingClientRect();
    if(b.y+b.height>=p2.y && b.y <= p2.y+p2.height)
    {
        if(b.x+b.width>=p2.x && b.x<=p2.x+p2.width){ return true;}
     
    }
}

function movement()
{
    var top1 = ball.style.top;
    var left1 = ball.style.left;
    var top = Number(top1.substring(0,top1.length-2));
    var left=Number(left1.substring(0,left1.length-2));
    var tossTop=Math.floor(Math.random()*2);
    var tossLeft=Math.floor(Math.random()*2);
    var topFlag=(tossTop==1)?true:false;
    var leftFlag=(tossLeft==1)?true:false;
    var speed=3;
    setInterval(function(){
        if(top<=35 && collision1() && topFlag==false){
            console.log("hit");
                topFlag=!topFlag;
                ballhit.pause();
                ballhit.play();
        }
        else if(top>=wHeight-62 && collision2() && topFlag==true){
            console.log("hit");
                topFlag=!topFlag;
                ballhit.pause();
                ballhit.play();
        }
        else
        {
            if(topFlag)
            {
                top+=speed;
            }
            else
            {
                top-=speed;
            }

        }
        if(top>=wHeight-37 || top<=10)
        {
            if(topFlag)
            {
                var n = Number(scoreP1.innerText);
                n++;
                scoreP1.innerHTML = (n>=10)?n:"0"+n;
                if(n==11)
                {
                    setTimeout(
                        function(){
                            window.alert("Player 1 won. Game Over");
                            window.location.reload();
                        },500);
                    
                }
            }        
            else
            {
                var n = Number(scoreP2.innerText);
                n+=1;
                scoreP2.innerHTML = (n>=10)?n:"0"+n;
                if(n==11)
                {
                    setTimeout(
                        function(){
                            window.alert("Player 2 won. Game Over");
                            window.location.reload();
                        },500);
                    
                }
            }        
            topFlag=!topFlag;
            ballmiss.pause();
            ballmiss.play();
        }
        if(left>=wWidth-35 || left<=0)
        {
            leftFlag=!leftFlag;
            ballbounce.pause();
            ballbounce.play();
        }  
        if(leftFlag)
        {
            left+=speed;
        }
        else
        {
            left-=speed;
        }
     
        ball.style.top = top+"px";
        ball.style.left = left+"px";
        var leftp1 = left-75;
        if(autoplay==true && leftp1>15 && leftp1<wWidth-160){
            player1.style.left=leftp1+"px"; 
            // player2.style.left=leftp1+"px"; 
        }
        else if(autoplay==true && left<=15)
        {
            player1.style.left="15px"; 
            // player2.style.left="15px"; 
        }  
        else if(autoplay==true && leftp1>=wWidth-160)
        {
            player1.style.left=(wWidth-160)-"px"; 
            // player2.style.left=(wWidth-160)-"px"; 
        }  
    },10);
}

function playerMovement(event)
{
    var orgLeft1 = player1.style.left;
    var orgLeft2 = player2.style.left;
    var left1 = Number(orgLeft1.substring(0,orgLeft1.length-2));
    var left2=Number(orgLeft2.substring(0,orgLeft2.length-2));
    var Key = event.key;
    if(autoplay==false && Key=="a" && left1>15)
    {
        left1-=15;
    }
    if(autoplay==false && Key=="d" && left1<wWidth-160)
    {
        left1+=15;
    }
    if(Key=="ArrowLeft" && left2>15)
    {
        left2-=15;
    }
    if(Key=="ArrowRight" && left2<wWidth-160)
    {
        left2+=15;
    }
    player1.style.left = left1+"px";
    player2.style.left = left2+"px";
}

function selectTheme(event)
{
    var theme = event.target.id;
    ball.style.backgroundImage = "url(static/"+theme+".png";
    boundry.style.backgroundImage = "url(static/"+theme+"background.png";
    var selectedTheme = document.getElementById(theme);
    for(let i=0; i<balls.length; i++)
{
    balls[i].style.borderColor = "transparent";
    balls[i].style.opacity = "0.5";
    balls[i].style.width= "38px";
    balls[i].style.height = "38px";

}
    selectedTheme.style.borderColor = "red";
    selectedTheme.style.opacity = "1";
    selectedTheme.style.width = "44px";
    selectedTheme.style.height = "44px";
    
}

function autoPlayOn()
{
    autoplay=!autoplay;
    if(autoplay==true)
    {
        player1.innerText="Computer";
    }
    else{
        player1.innerText="Player 1";
    }
}

play.addEventListener('click',movement);
document.addEventListener('keydown',playerMovement);
autoplayBtn.addEventListener('click',autoPlayOn);
for(let i=0; i<balls.length; i++)
{
    balls[i].addEventListener("click",selectTheme);
}