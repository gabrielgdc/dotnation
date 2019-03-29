import { AngularFireStorageModule, AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the StoragedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoragedataProvider {

  constructor(public http: HttpClient, private afStorage: AngularFireStorage, private afDb: AngularFireDatabase) {
    console.log('Hello StoragedataProvider Provider');
  }

  uploadToStorage(information): AngularFireUploadTask {
    let newName = `${new Date().getTime()}.txt`;
 
    return this.afStorage.ref(`files/${newName}`).putString(information);
  }

  getFiles() {
    let ref = this.afDb.list('files');
 
    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

}
