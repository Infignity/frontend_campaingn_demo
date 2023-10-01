import { proxy } from 'valtio';

export type DetailsProp = {
  _id: number | string | any;
  _source: {
    full_name: string;
    job_title: string;
    location_name: string;
    job_title_role: string;
    job_company_name: string;
  }
};

// TODO: properly define the props
export type AnalysisStoreProps = {
  task_id: string;
  analysis: {
    problemsIdentified: any;
    solutionsOffered: any;
    demographics: any;
    behaviour: any;
    motivation: any;
    segmentation: any
    marketSize: any
    potential: any
  };
  filters: {
    country: any;
    job_title: any;
    keyword: any;
    reason: any;
  }
  details: DetailsProp[];
  loading: boolean;
  selectedDetail: DetailsProp | null;
  currentIndex: number;
  detailloading: boolean;
  emailLoading: boolean;
  generatedEmails: string[];
};

// state for the application
export const analysisStore: AnalysisStoreProps = proxy({
  task_id: "",
  analysis: {
    problemsIdentified: [],
    solutionsOffered: [],
    demographics: [],
    behaviour: [],
    motivation: [],
    segmentation: [],
    marketSize: [],
    potential: [],
  },
  filters: {
    country: [],
    job_title: [],
    keyword: [],
    reason: [],
  },
  loading: true,
  details: [],
  selectedDetail: null,
  generatedEmails: [],
  currentIndex: 0,
  detailloading: false,
  emailLoading: false,
});

