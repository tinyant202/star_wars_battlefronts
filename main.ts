namespace SpriteKind {
    export const Clone = SpriteKind.create()
    export const Droid = SpriteKind.create()
    export const Battery = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Droid, function (sprite) {
    sprites.setDataNumber(sprite, "Shoot", 10)
    Droid_AI(sprite)
})
function Droid_AI (Droid: Sprite) {
    if (sprites.readDataNumber(Droid, "Shoot") != 0) {
        for (let value of sprites.allOfKind(SpriteKind.Clone)) {
            if (spriteutils.distanceBetween(Droid, value) <= 40) {
                if (sprites.readDataNumber(Droid, "Shoot") != 0) {
                    projectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . 2 3 1 3 2 . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, Droid, 50, 50)
                    spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(Droid, value), 100)
                    spriteFx.faceToward(projectile, value)
                    sprites.changeDataNumberBy(Droid, "Shoot", -1)
                }
            }
            if (spriteutils.distanceBetween(Droid, value) <= 60) {
                scene.followPath(Droid, scene.aStar(Droid.tilemapLocation(), value.tilemapLocation()))
                spriteFx.faceToward(Droid, value)
            }
        }
    } else {
        for (let value of sprites.allOfKind(SpriteKind.Battery)) {
            if (spriteutils.distanceBetween(Droid, value) <= 60) {
                scene.followPath(Droid, scene.aStar(Droid.tilemapLocation(), value.tilemapLocation()))
            }
        }
    }
    timer.after(500, function () {
        Droid_AI(Droid)
    })
}
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Clone, 500, function (sprite) {
    spriteFx.faceDirection(sprite, spriteutils.heading(sprite))
})
sprites.onCreated(SpriteKind.Clone, function (sprite) {
    sprites.setDataNumber(sprite, "Shoot", 10)
    Clone_AI(sprite)
})
sprites.onOverlap(SpriteKind.Clone, SpriteKind.Battery, function (sprite, otherSprite) {
    sprites.setDataNumber(sprite, "Shoot", 10)
    spriteFx.faceDirection(sprite, spriteutils.heading(sprite))
})
scene.onPathCompletion(SpriteKind.Droid, function (sprite, location) {
    scene.followPath(sprite, scene.aStar(sprite.tilemapLocation(), tiles.getTileLocation(randint(0, 15), randint(0, 15))))
})
sprites.onOverlap(SpriteKind.Droid, SpriteKind.Battery, function (sprite, otherSprite) {
    sprites.setDataNumber(sprite, "Shoot", 10)
    spriteFx.faceDirection(sprite, spriteutils.heading(sprite))
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Droid, 500, function (sprite) {
    spriteFx.faceDirection(sprite, spriteutils.heading(sprite))
})
scene.onPathCompletion(SpriteKind.Clone, function (sprite, location) {
    scene.followPath(sprite, scene.aStar(sprite.tilemapLocation(), tiles.getTileLocation(randint(0, 15), randint(0, 15))))
})
function Clone_AI (Clone: Sprite) {
    if (sprites.readDataNumber(Clone, "Shoot") != 0) {
        for (let value of sprites.allOfKind(SpriteKind.Droid)) {
            if (spriteutils.distanceBetween(Clone, value) <= 40) {
                if (sprites.readDataNumber(Clone, "Shoot") != 0) {
                    projectile = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . 8 9 1 9 8 . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, Clone, 50, 50)
                    spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(Clone, value), 100)
                    spriteFx.faceToward(projectile, value)
                    sprites.changeDataNumberBy(Clone, "Shoot", -1)
                }
            }
            if (spriteutils.distanceBetween(Clone, value) <= 60) {
                scene.followPath(Clone, scene.aStar(Clone.tilemapLocation(), value.tilemapLocation()))
                spriteFx.faceToward(Clone, value)
            }
        }
    } else {
        for (let value of sprites.allOfKind(SpriteKind.Battery)) {
            if (spriteutils.distanceBetween(Clone, value) <= 60) {
                scene.followPath(Clone, scene.aStar(Clone.tilemapLocation(), value.tilemapLocation()))
            }
        }
    }
    timer.after(500, function () {
        Clone_AI(Clone)
    })
}
let projectile: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
for (let index = 0; index < 4; index++) {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 f f f f . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . 1 1 f 1 1 . . . . . . 
        . . . . . b b f f f . . . . . . 
        . . . . . 1 1 f 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Clone)
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . d f f f f . . . . 
        . . . . . . . d . . . . . . . . 
        . . . d d d d e d . . . . . . . 
        . . . . . d d d d d d . . . . . 
        . . . d d d d e d . . . . . . . 
        . . . . . . . d . . . . . . . . 
        . . . . . . . d . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Droid)
    scene.cameraFollowSprite(mySprite2)
    tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
    tiles.placeOnRandomTile(mySprite2, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    mySprite3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 1 . . . . . . 
        . . . . b b b b b b b b b . . . 
        . . . . b b b b b 9 b b b . . . 
        . . . . b b b b b 9 9 b b . . . 
        . . . . b b b b b 9 9 b b . . . 
        . . . . b b b 9 9 9 9 b b . . . 
        . . . . b b b 9 9 b b b b . . . 
        . . . . b b b 9 9 b b b b . . . 
        . . . . b b b b 9 b b b b . . . 
        . . . . b b b b b b b b b . . . 
        . . . . b b b b b b b b b . . . 
        `, SpriteKind.Battery)
    tiles.placeOnTile(mySprite3, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
