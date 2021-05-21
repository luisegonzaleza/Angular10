import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VideoGames } from '../model/videogames.model';
import { DataService } from '../services/data.service';
import { VideogamesService } from '../services/videogames.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource <VideoGames>();
  columns = ['category', 'price', 'console', 'actions']

  constructor(private dataService: DataService, private videoGame: VideogamesService, private router: Router) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  loadData(): void{
    this.dataService.isLoading.next(true);
    this.videoGame.getVideoGames().subscribe(videogames =>{
      this.dataSource.data = videogames;
      this.dataService.isLoading.next(false);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Sorry, we cant find the elements');
      // alert('Sorry, we cant find the elements');
    }
    );
  }

  edit(id: string){
    console.log(id);
    this.router.navigate(['videogames', id])
  }

  newItem(): void{
    this.router.navigate(['videogames'])
  }

  deleteItem(id: string){
    this.dataService.isLoading.next(true);
    this.videoGame.deleteVideoGame(id).subscribe(() =>{
      this.loadData();
      this.dataService.message.next('Delete successful');
      this.dataService.isLoading.next(false);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Problem with delete');
    });
  }

}
