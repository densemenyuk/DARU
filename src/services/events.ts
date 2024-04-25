import axios from 'axios';
import {
  CmsEvent,
  CmsEventCategory,
  CmsItemResponse,
  CmsListResponse,
} from '../types/events';

const CMS_ROOT = 'https://dar-u-cms.dar-dev.zone/api';

export const getEvents = (params?: { sort?: string; categoryId?: number }) => {
  return axios
    .get<CmsListResponse<CmsEvent>>(`${CMS_ROOT}/events`, {
      params: {
        populate: 'cover, galery, event_category',
        'filters[event_category]': params?.categoryId ?? undefined,
        'sort[0]': params?.sort ?? undefined,
      },
    })
    .then((r) => r.data);
};

export const getEvent = (id: number) => {
  return axios
    .get<CmsItemResponse<CmsEvent>>(`${CMS_ROOT}/events/${id}`, {
      params: {
        populate: 'cover, galery, event_category',
      },
    })
    .then((r) => r.data);
};

export const getCategories = () => {
  return axios
    .get<CmsListResponse<CmsEventCategory>>(`${CMS_ROOT}/event-categories`, {
      params: {},
    })
    .then((r) => r.data);
};

export const getMyEvents = () => {
  const token = localStorage.getitem('events-auth');
  return axios
    .get<CmsListResponse<CmsEvent>>(`${CMS_ROOT}/events`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
      params: {
        populate: 'cover, galery, event_category',
        // 'filters [$and] [0] [creator][id][$eq]': userId,
      },
    })
    .then((r) => r.data);
};
