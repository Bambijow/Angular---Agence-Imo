import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesService} from '../services/properties.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'monAgence';
  properties = [];
  propertiesSubscription: Subscription;
  constructor(
    private propertiesService: PropertiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
    });
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  getSoldValue(sold){
    if(sold) return 'red';
    else return 'green';
  }


  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}
