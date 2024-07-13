import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ListAlbums} from "../models/ListAlbums";

@Injectable()
export class ListAlbumsService {

  albumsApiUrl = 'http://localhost:3000/api/albums';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<ListAlbums[]> {
    return this.http.get<ListAlbums[]>(this.albumsApiUrl);
  }

  createAlbum(album: ListAlbums): Observable<ListAlbums> {
    return this.http.post<ListAlbums>(this.albumsApiUrl, album);
  }

  editAlbum(album: ListAlbums): Observable<ListAlbums> {
    // Adicione um corpo vazio para a solicitação PUT
    return this.http.put<ListAlbums>(`${this.albumsApiUrl}/${album.id}`, album,
      { headers: { 'Content-Type': 'application/json' }});
  }

  deleteAlbum(id: number): Observable<any> {
    // Adicione um corpo vazio para a solicitação DELETE
    return this.http.delete<any>(`${this.albumsApiUrl}/${id}`);
  }
}
