export interface EntityStore<TEntityViewModel, TEntityCreateModel> {
    create(dto: TEntityCreateModel): Promise<TEntityViewModel>;
    delete(entity: TEntityViewModel): Promise<TEntityViewModel>;
}
