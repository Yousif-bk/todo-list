import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/models/AppRoutes';
import { Todo } from 'src/app/shared/models/Task';
import { AppService } from 'src/app/shared/services/app/app.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  // Ui State
  uiState = {
    isSubmitting:false,
    isLoading:false,
    isCreate:false,
    priorityOption:[
      { id: 1,title:"High"},
      { id: 2, title:"Low"},
    ]
  }

 /* Forms */
 todoFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForms();
     this.getTask();
  }


  initForms() {
    // Construct signIn form
    this.todoFormGroup = this.formBuilder.group({
      title: [null, Validators.required],
      note: [null, Validators.required],
      priority: [null, Validators.required],
    });
  }

  createTask(){
    this.uiState.isLoading = true;
    this.uiState.isSubmitting = true;
    if(!this.todoFormGroup.valid){
      this.uiState.isLoading = false;
      return;
    }
    this.appService.createTask(this.todoFormGroup.value).then((response =>{
      this.uiState.isLoading = false;
      this.uiState.isSubmitting = false;
      this.router.navigate([AppRoutes.Todo.main])
    })).catch(error =>{
      this.uiState.isLoading = false;
    })
  }

  // get Task
  getTask(){
    const id = this.route.snapshot.paramMap.get('id')
    if(!id){
      this.uiState.isCreate = true;
      return;
    }
    this.appService.getTask(id).subscribe(res =>{
      this.setSavedTaskData(res);
    })
  }


 // Set product data to form
  private setSavedTaskData(savedTask: any): void {
    // Consturct form patch data
    const patchData: Todo = {
      title: savedTask.title,
      note: savedTask.note,
      priority: savedTask.priority
    }    // Patch the form data
    this.todoFormGroup.patchValue(patchData);
  }

  updateTask(){
    const id = this.route.snapshot.paramMap.get('id')
    this.uiState.isLoading = true;
    this.appService.updateTask(this.todoFormGroup.value, id).then(() =>{
      this.uiState.isLoading = false;
      this.router.navigate([AppRoutes.Todo.main])
    })

  }
}
