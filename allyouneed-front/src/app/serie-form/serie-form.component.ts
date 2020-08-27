import { Component, OnInit } from '@angular/core';
import { Serie } from '../models/serie';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.css']
})
export class SerieFormComponent implements OnInit {

  newSerie: Serie;
  id: Number;

  constructor(private serieService: SeriesService,
              private route: ActivatedRoute,
              private router: Router) { 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.newSerie = this.serieService.getSerie(this.id);
    }else {
      this.newSerie = new Serie();
    }
  }

  ngOnInit() {
  }

  validateForm() {
    if (this.id) {
      this.serieService.updateSerie(this.newSerie);
      console.log(this.newSerie)
      this.router.navigate(['/series']);
    } else {
      this.serieService.createSerie(this.newSerie);
      this.router.navigate(['/series']);
    }
  }

}
