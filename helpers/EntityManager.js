export class EntityManager {
    nextEntityId = 10000;
    entitySubsystems = [];
    genericSubsystems = [];
    entities = null;
    engineState = null;

    setEntities(entities) {
        this.entities = entities;
    }

    getEntities() {
        return this.entities;
    }

    getTimeDelta() {
        return this.engineState.time.delta;
    }

    getTimeCurrent() {
        return this.engineState.time.current;
    }

    getTouches(type) {
        return this.engineState.touches.filter(t => t.type === type);
    }

    dispatch(obj) {
        this.engineState.dispatch(obj);
    }

    registerEntitySubsystem(entityType, subsystemCallback) {
        this.entitySubsystems.push({
            entityType: entityType,
            callback: subsystemCallback
        });
    }

    registerGenericSubsystem(subsystemCallback) {
        this.genericSubsystems.push({
            callback: subsystemCallback
        });
    }

    systemCallback(entities, engineState) {
        this.entities = entities;
        this.engineState = engineState;

        for (let subsystem of this.genericSubsystems) {
            subsystem.callback();
        }

        for (let subsystem of this.entitySubsystems) {
            for (const [entityId, entity] of Object.entries(entities)) {
                if (entity.type == subsystem.entityType) {
                    subsystem.callback(entityId, entity);
                }
            }
        }

        return entities;
    }

    forEntity(entityType, callback) {
        for (const [entityId, entity] of Object.entries(this.entities)) {
            if (entity.type == entityType) {
                callback(entityId, entity);
                break;
            }
        }
    }

    forEntities(entityType, callback) {
        for (const [entityId, entity] of Object.entries(this.entities)) {
            if (entity.type == entityType) {
                callback(entityId, entity);
            }
        }
    }

    getEntityByType(entityType) {
        return Object.entries(this.entities).find(e => e[1].type == entityType);
    }

    spawnEntity(type, renderer, data) {
        data.type = type;
        data.renderer = renderer;
        this.entities[this.nextEntityId] = data;
        this.nextEntityId += 1;
    }

    deleteEntity(entityId) {
        delete this.entities[entityId];
    }

    isCircleCircleCollision(e1, e2) {
        let x1, y1, w1, h1, x2, y2, w2, h2;

        if (e1.collisionBox) {
            [x1, y1] = e1.collisionBox[0];
            [w1, h1] = e1.collisionBox[1];
        } else {
            [x1, y1] = e1.position;
            [w1, h1] = e1.dimensions;
        }

        if (e2.collisionBox) {
            [x2, y2] = e2.collisionBox[0];
            [w2, h2] = e2.collisionBox[1];
        } else {
            [x2, y2] = e2.position;
            [w2, h2] = e2.dimensions;
        }

        const r = (w1 + h1) / 4;

        return Math.pow(x1 - x2, 2)
            + Math.pow(y1 - y2, 2) < r * r;

    }

    isPointCircleCollision(x1, y1, e2) {
        let x2, y2, w2, h2;
        if (e2.collisionBox) {
            [x2, y2] = e2.collisionBox[0];
            [w2, h2] = e2.collisionBox[1];
        } else {
            [x2, y2] = e2.position;
            [w2, h2] = e2.dimensions;
        }

        const r = (w2 + h2) / 4;

        return Math.pow(x1 - x2, 2)
            + Math.pow(y1 - y2, 2) < r * r;

    }

    randomEvent(r) {
        return r * this.getTimeDelta() / 1000 >=  Math.random();
    }
}

