/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class SlotQueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm as string;
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

    const { date, serviceId, ...restQuery } = queryObj;

    const queryConditions: Record<string, any> = { ...restQuery };

    // Handle date filtering similarly to your working code
    if (typeof date === 'string' && date.length > 0) {
      const dateArray = date.split(',').filter(Boolean);
      if (dateArray.length > 0) {
        queryConditions.date = { $in: dateArray };
      }
    }

    if (serviceId) {
      queryConditions.service = serviceId;
    }

    this.modelQuery = this.modelQuery.find(queryConditions as FilterQuery<T>);

    return this;
  }

  sort() {
    // Sort by date ascending and then by startTime and endTime ascending
    const sortCriteria = 'date startTime endTime';
    this.modelQuery = this.modelQuery.sort(sortCriteria);
    return this;
  }

  paginate() {
    const limit = Number(this.query.limit) || 10;
    const page = Number(this.query.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  populate(populateFields: string | string[]) {
    this.modelQuery = this.modelQuery.populate(populateFields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default SlotQueryBuilder;
