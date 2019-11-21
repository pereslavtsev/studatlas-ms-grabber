import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetDocumentRequest } from '../interfaces/requests/get-document-request.interface';
import {
  ListDocumentSaveStories,
} from '../interfaces/requests/list-document-save-stories.interface';
import { ListGroupDocumentsRequest } from '../interfaces/requests/list-group-documents-request.interface';
import { DocumentsService } from '../services/documents.service';
import { SaveStoriesService } from '../services/save-stories.service';

@Controller()
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly saveStoriesService: SaveStoriesService,
  ) {}

  @GrpcMethod('DocumentService', 'GetDocument')
  findOne({ id, academyId }: GetDocumentRequest) {
    return this.documentsService.fetchById(id, academyId);
  }

  @GrpcMethod('DocumentService', 'ListGroupDocuments')
  findByGroupId({ academyId, facultyId, groupId, years, semester }: ListGroupDocumentsRequest) {
    return this.documentsService.fetchByGroupId({ academyId, facultyId, groupId, years, semester });
  }

  @GrpcMethod('DocumentService', 'ListDocumentSaveStories')
  async findHistoryByBookId({ id, academyId }: ListDocumentSaveStories) {
    const saveStories = await this.saveStoriesService.fetchStoriesByDocumentId(id, academyId);
    return { data: saveStories };
  }
}