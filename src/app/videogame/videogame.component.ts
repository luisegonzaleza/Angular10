import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGames } from '../model/videogames.model';
import { DataService } from '../services/data.service';
import { VideogamesService } from '../services/videogames.service';

@Component({
  selector: 'app-videogame',
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.css']
})
export class VideogameComponent implements OnInit {
  formVideoGame: FormGroup = this.formBuilder.group({});
  disableButton = false;
  id: string = '';
  title: string = 'Create videogame';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private videoGame: VideogamesService, private activatedRoute: ActivatedRoute) {
    this.formVideoGame = this.formBuilder.group({
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      console: ['', [Validators.required]]
    })

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;
    });

    this.activatedRoute.params.subscribe(parameters =>{
      if(parameters.id){
        this.id = parameters.id;
        this.title = 'Update videogame';

        this.dataService.isLoading.next(true);
        this.videoGame.getSingleVideoGame(parameters.id).subscribe(item =>{
          this.formVideoGame.get('category')?.setValue(item.category);
          this.formVideoGame.get('price')?.setValue(item.price);
          this.formVideoGame.get('console')?.setValue(item.console);
          this.dataService.isLoading.next(false);

          // this.formVideoGame.patchValue(item); toma los elementos del formulario y los actualiza de manera automatica
        });
      }
    });
  }

  ngOnInit(): void {
  }

  save(): void{
    const data ={
      category: this.formVideoGame.get('category')?.value,
      price: this.formVideoGame.get('price')?.value,
      console: this.formVideoGame.get('console')?.value
    } as VideoGames;

    console.log(data);

    this.dataService.isLoading.next(true);

    this.videoGame.saveVideoGame(data, this.id).subscribe(() =>{
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Unexpected error');
      // alert('Unexpected error')
    });
  }
}
