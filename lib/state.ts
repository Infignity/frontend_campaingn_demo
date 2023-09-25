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
  job_title: string;
  job_title_role: string;
  job_company_name: string;
};

export type AnalysisStoreProps = {
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
  analysis: [],
  loading: true,
  details: [],
  selectedDetail: null, // Add a property to store the selected detail
  generatedEmails: [] as string[],
  currentIndex: 0,
  detailloading: false,
  emailLoading: false,
  
});
