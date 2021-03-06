import { Injectable } from '@nestjs/common';
import { DataGrid } from '../../grabber/classes/data-grid.class';
import { GrabberService } from '../../grabber/services/grabber.service';
import { cmb } from '../../grabber/utils/ui.util';
import { ListStatisticsDto } from '../dto/list-statistics.dto';
import { Statistics } from '../interfaces/statistics.interface';
import { STATISTICS_SCHEMA } from '../mocks/statistics-schema.mock';

@Injectable()
export class StatisticsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(
    { academyId, years, semester }: ListStatisticsDto,
    mode: string,
  ): Promise<Statistics[]> {
    const client = await this.grabberService.create(academyId, 'statistics');
    const { data } = await client.request({
      method: 'post',
      data: {
        [cmb('Years')]: years,
        [cmb('Sem')]: semester,
      },
      params: {
        mode,
      },
    });
    const dataGrid = new DataGrid('table[id*="ucStat"]', data);
    return dataGrid.extract(STATISTICS_SCHEMA);
  }

  protected fetchAll({ academyId, semester, years }: ListStatisticsDto, mode: string) {
    let statMode;
    switch (mode) {
      case 'faculties':
        statMode = 'statfac';
        break;
      case 'divisions':
        statMode = 'statkaf';
        break;
    }
    return this.fetch({ academyId, semester, years }, statMode);
  }

  async fetchByDivisions({ academyId, semester, years }: ListStatisticsDto) {
    return await this.fetchAll(
      {
        academyId,
        semester,
        years,
      },
      'divisions',
    );
  }

  async fetchByFaculties({ academyId, semester, years }: ListStatisticsDto) {
    return this.fetchAll(
      {
        academyId,
        semester,
        years,
      },
      'faculties',
    );
  }
}
