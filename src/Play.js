class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)

        //add ball
        this.ball = this.physics.add.sprite(width / 2, height - height /10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        //add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width/2))
        wallA.body.setImmovable(true)
        wallA.setVelocityX(500)
        wallA.body.setCollideWorldBounds(true)
        wallA.body.setBounce(1)

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width/2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])
        
        //one way
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width/2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        //variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100

        //moves the ball up and down
        this.input.on('pointerdown', (pointer) => {
            let shotDirection 
            let shotDirection2

            //moves the ball up and down
            pointer.y <= this.ball.y ? shotDirection = 1 : shotDirection = -1

            pointer.x <= this.ball.x ? shotDirection2 = 1 : shotDirection2 = -1

            this.ball.body.setVelocityX(Phaser.Math.Between(0, this.SHOT_VELOCITY_X) * shotDirection2)
            //this.ball.body.setVelocityX(200)

            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
            //this.ball.body.setVelocityY(200)
        })

        // //moves the ball left and and right
        // this.input.on('pointerdown', (pointer) => {
        //     let shotDirection2

        //     pointer.x <= this.ball.x ? shotDirection2 = 1 : shotDirection2 = -1

        //     this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
        //     //this.ball.body.setVelocityX(200)

        //     this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection2)
        //     //this.ball.body.setVelocityY(200)
        // })

        this.physics.add.collider(this.ball, this.cup, (ball,cup)=> {
            this.ball.setX(width / 2)
            this.ball.setY(height - height / 10)

            this.ball.body.setVelocity(0)
            // this.ball.destroy()

            // //Add logic so the ball resets to the bottom on a successful “hole-in”
            // this.ball = this.physics.add.sprite(width / 2, height - height /10, 'ball')
            // this.ball.body.setCircle(this.ball.width / 2)
            // this.ball.body.setCollideWorldBounds(true)
            // this.ball.body.setBounce(0.5)
            // this.ball.body.setDamping(true).setDrag(0.5)

        })

        this.physics.add.collider(this.ball, this.walls)
        this.physics.add.collider(this.ball, this.oneWay)
    }

    update() {

    }
}