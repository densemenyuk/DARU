export interface CmsListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CmsItemResponse<T> {
  data: T;
  meta: unknown;
}

export interface CmsEvent {
  id: number;
  attributes: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    votes: string;
    item: string;
    // creator: number;
    event_category: {
      data: CmsEventCategory;
    };
    cover: {
      data: CmsImage;
    };
    creator: {
      data: {
        id: number;
      };
    };
  };
}

export interface CmsEventCategory {
  id: number;
  attributes: {
    title: string;
    sort_order: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CmsCreateEventRequest {
  title: string;
  description: string;
  cover: number | null;
  event_category: number | null;
  creator: number;
}

// export interface CmsimageFormat {
//     [key: string]: {
//         ext: ".jpg",
//         url: "https://dev-dar-cms-uploads.s3.eu-west-1.amazonaws.com/small_c83ed8e03226212b6eedc73e7f95f142_800xauto_q_85_b43a1cf922.jpg",
//         hash: "small_c83ed8e03226212b6eedc73e7f95f142_800xauto_q_85_b43a1cf922",
//         mime: "image/jpeg",
//         name: "small_c83ed8e03226212b6eedc73e7f95f142_800xauto-q-85.jpg",
//         path: null,
//         size: 38.65,
//         width: 400,
//         height: 500,
//         sizeInBytes: 38650
//     }
// }

export interface CmsImage {
  id: number;
  attributes: {
    id: number;
    name: string;
    width: number;
    height: number;
    url: string;
  };
}
