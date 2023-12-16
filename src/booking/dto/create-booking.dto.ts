export class CreateBookingDto {
    readonly date: Date;
    readonly status: string;
    readonly userId: number;
    readonly serviceId: number;
}
