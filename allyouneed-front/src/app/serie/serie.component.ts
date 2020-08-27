import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { Serie } from '../models/serie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  idserie: Number;
  serie: Serie;

  constructor(private serieService: SeriesService,
              private route: ActivatedRoute) { 
    this.serie = new Serie();
  }

  ngOnInit() {
    this.idserie = Number(this.route.snapshot.params.id);
    this.serie = this.serieService.getSerie(this.idserie);
  }

}
