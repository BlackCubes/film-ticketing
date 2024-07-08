import { Query } from 'mongoose';

// **** TYPES **** //
interface IQueryString {
  page?: string;
  limit?: string;
  [key: string]: any;
}

// **** CLASS **** //
class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: IQueryString;

  constructor(query: Query<T[], T>, queryString: IQueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    let queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    queryObj = JSON.parse(JSON.stringify(queryObj).replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`));

    this.query = this.query.find(queryObj);

    return this;
  }

  paginate(): this {
    const page = typeof this.queryString.page === 'string' ? parseInt(this.queryString.page) : 1;

    const limit = typeof this.queryString.limit === 'string' ? parseInt(this.queryString.limit) : 100;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
