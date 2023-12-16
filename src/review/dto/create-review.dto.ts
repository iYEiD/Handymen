export class CreateReviewDto {
    readonly rating: number;
    readonly comments: string;
    readonly userId: number;
    readonly serviceId: number;
}
