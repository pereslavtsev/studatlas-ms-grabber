import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AcademiesService } from './academies.service';
import { GetAcademyDto } from './dto/get-academy.dto';

@Controller()
export class AcademiesController {
  constructor(private readonly academiesService: AcademiesService) {}

  @GrpcMethod('AcademyService', 'GetAcademy')
  @UsePipes(new ValidationPipe())
  async findOne({ id }: GetAcademyDto) {
    // tslint:disable-next-line:no-console
    console.log(`Receive an academy by ID "${id}"...`);
    const academy = await this.academiesService.findById(id);
    // tslint:disable-next-line:no-console
    console.log('Response:', academy);
    return { data: [academy] };
  }

  @GrpcMethod('AcademyService', 'ListAcademies')
  @UsePipes(new ValidationPipe())
  async findAll() {
    const academies = await this.academiesService.findAll();
    return { data: academies };
  }
}
