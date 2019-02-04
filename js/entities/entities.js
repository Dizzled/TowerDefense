/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

/* Filter collision detection with collision shapes, enemies and collectables*/
            this.body.setCollisionMask(
            me.collision.types.WORLD_SHAPE |
            me.collision.types.ENEMY_OBJECT |
            me.collision.types.COLLECTABLE_OBJECT
        );


    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
       if (response.b.body.collisionType === me.collision.types.WORLD_SHAPE) {
           // makes the other entity solid, by substracting the overlap vector to the current position
          this.pos.sub(response.overlapV);
           // not solid
           return false;
       }
       // Make the object solid
       return true;
    }
});
