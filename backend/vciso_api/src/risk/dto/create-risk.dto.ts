export class CreateRiskDto {

    title: string;
    description: string;
    likelihood: number;
    impact: number;
    status: string;
    category: string;
    owner: string;
    treatmentPlan: string;
    mitigationDeadline: string;
    frameworks: string[];
    residualLikelihood: number;
    residualImpact: number;
    tags: string[];
    clientId: string;
}
