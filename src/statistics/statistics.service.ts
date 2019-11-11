import { Injectable } from '@nestjs/common';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/services/grabber.service';
import { STATISTICS_SCHEMA } from './mocks/statistics-schema.mock';

@Injectable()
export class StatisticsService {
  constructor(private readonly grabberService: GrabberService) {}

  private async fetch(academyId: string, params?: any) {
    const client = await this.grabberService.create(academyId);
    const { data } = await client.get('/Stat/Default.aspx', {
      params,
    });
    const dataGrid = new DataGrid('table[id*="ucStat"]', data);
    return dataGrid.extract(STATISTICS_SCHEMA);
  }

  protected fetchAll(
    year: string,
    semester: number,
    mode: string,
    academyId: string,
  ) {
    let statMode;
    switch (mode) {
      case 'faculties':
        statMode = 'statfac';
        break;
      case 'divisions':
        statMode = 'statkaf';
        break;
    }
    return this.fetch(academyId, {
      mode: statMode,
      // year,
      // sem: semester,
    });
  }

  async fetchByDivisions(year: string, semester: number, academyId: string) {
    return await this.fetchAll(year, semester, 'divisions', academyId);
  }

  async fetchByFaculties(year: string, semester: number, academyId: string) {
    return await this.fetchAll(year, semester, 'faculties', academyId);
  }
}