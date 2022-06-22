import { Entity } from 'dataLayer/entities/entity';
import { entityNameWeakMap } from 'dataLayer/entityNameWeakMap';
import { FilterQuery, Model, Types } from 'mongoose';

export class Repository<T extends Entity> {
    constructor(private readonly model: Model<T>, private readonly inject: boolean = true) {}

    async findAllAsync(): Promise<T[]> {
        return this.#injectAll(await this.model.find());
    }

    async findAllByIdAsync(ids: Types.ObjectId[]) {
        return this.#injectAll(
            await this.model.find({
                _id: { $in: ids },
            })
        );
    }

    async findByIdAsync(id: Types.ObjectId): Promise<T> {
        return this.#inject(await this.model.findById(id));
    }

    async findAsync(filter: FilterQuery<T>): Promise<T[]> {
        return this.#injectAll(await this.model.find(filter));
    }

    async findOneAsync(filter: FilterQuery<T>): Promise<T> {
        return this.#inject(await this.model.findOne(filter));
    }

    #inject(entity: T): T {
        if (this.inject && entity) {
            entityNameWeakMap.set(entity, {
                entityName: this.model.name,
            });
        }

        return entity;
    }

    #injectAll(entities: T[]): T[] {
        entities.forEach((entity) => this.#inject(entity));
        return entities;
    }
}
