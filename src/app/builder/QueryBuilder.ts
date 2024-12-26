import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    console.log(queryObj);

    // Filtering
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields', 'filter'];

    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.filter) {

      this.modelQuery = this.modelQuery.find({ author: this.query.filter } as FilterQuery<T>);
      //console.log(this.modelQuery)

    } else {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }
    //console.log(this)
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(sortOrder + sort);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
