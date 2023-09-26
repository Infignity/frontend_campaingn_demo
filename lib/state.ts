// state.ts
import { AnalysisProps } from '@/components/AnalysisPage';
import { proxy } from 'valtio';


// change from any define individual type
export const store:any = proxy({
  generatedEmails: [] as string[],
  currentIndex: 0,
  formData: {
    first_name: '',
  },
  loading: false,
  emailLoading: false,
  fullName: '',
  summary: '',
  jobTitle: '',
  emailData: {
    first_name: '',
    summary: '',
    job_title: '',
    company: '',
  },
});

// AnalysisStoreProps.ts

export type DetailsProp = {
  _id: number | string | any;
  _source: {
    full_name: string;
    job_title: string;
    job_title_role: string;
    job_company_name: string;
  }
};

export type AnalysisStoreProps = {
  task_id: string;
  analysis: [];
  details: DetailsProp[];
  loading: boolean;
  selectedDetail: DetailsProp | null;
  currentIndex: number,
  detailloading: boolean,
  emailLoading: boolean,
  generatedEmails: any[]
};

export const analysisStore: AnalysisStoreProps = proxy({
  task_id: "",
  analysis: [],
  loading: true,
  details: [],
  selectedDetail: null,
  generatedEmails: [] as string[],
  currentIndex: 0,
  detailloading: false,
  emailLoading: false,
  
});
