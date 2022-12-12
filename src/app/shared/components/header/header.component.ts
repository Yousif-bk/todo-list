import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selected ="";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut(){
    this.authService.signOut();
  }

  setSelected(active: string){
    this.selected = active
  }
}
