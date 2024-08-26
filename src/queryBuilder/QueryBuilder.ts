import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>; // the model in which the query operations  will be executed
  public query: Record<string, unknown>; // the query of req.query

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
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

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    const { minPrice, maxPrice, minTime, maxTime, ...restQuery } = queryObj;

    const min = parseFloat(minPrice as string) || 0;
    const max = parseFloat(maxPrice as string) || Number.MAX_VALUE;
    const start = parseFloat(minTime as string) || 10;
    const end = parseFloat(maxTime as string) || 120;

    const combinedQuery = {
      ...restQuery,
      price: {
        $gte: min,
        $lte: max,
      },
      duration: {
        $gte: start,
        $lte: end,
      },
    };

    this.modelQuery = this.modelQuery.find(combinedQuery as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    // const limit = Number(this.query.limit) || 10;
    // const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit);
    const page = Number(this.query.page);
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

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
