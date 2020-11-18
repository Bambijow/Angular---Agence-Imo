import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Property} from '../interfaces/property';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();
  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  getProperties(){
    firebase.database().ref('/properties').on('value',
      (data) => {
        this.properties = data.val() ? data.val() : [];
        this.emitProperties();
      });
  }

  getSingleProperty(index) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + index).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
        }
    );
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  createProperty(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  removeProperty(index){
    this.properties.splice(index, 1);
    this.saveProperties();
  }

  updateProperty(property: Property, index){
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const upload = firebase.storage().ref().child('images/properties/' + uniqueId + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement');
          },
          (error) => {
          console.error(error);
          reject(error);
          },
          () => {
            console.log('Chargé');
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            )
          }
          );
      }
    );
  }

  removeFile(fileLink: string){
    if(fileLink) {
      firebase.storage().refFromURL(fileLink).delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
