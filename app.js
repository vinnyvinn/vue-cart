new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack(){
             var damage = this.calculateDamage(10,3);
            this.monsterHealth -=damage;
             this.turns.unshift({
                 isPlayer:true,
                 text:'Player hits Monster for '+ damage 
             });
            if(this.checkWin()){
                return;
            }
           
          this.playerHealth -=this.calculateDamage(12,5);
          this.checkWin();
        },
        specialAttack(){
            var damage = this.calculateDamage(20,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster hard for '+ damage 
            });
            if(this.checkWin()){
                return;
            }
          this.monsterAttacks();
        },
        heal(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
            }
            else{
                this.playerHealth =100;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals fo 10' 
            });
        this.monsterAttacks();
        },
        giveUp(){
        this.gameIsRunning = false;
        },
        monsterAttacks(){
            var damage = this.calculateDamage(12,5);
            this.playerHealth -=damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits Player for '+ damage 
            });
        },
        calculateDamage(max,min){
          return  Math.max(Math.floor(Math.random()*10) +1,min); 
        },
        checkWin(){
            if (this.monsterHealth <= 0){
                if(confirm('You Won! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0){
                if(confirm('You Lost! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                this.gameIsRunning = false;
                return true;
            } 
            return false;
        }
    }
})