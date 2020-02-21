
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { AuthenticationService } from 'app/services/authentication.service ';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private dataSource: any;
    private registerForm: FormGroup;

    constructor(public fb: FormBuilder,
        private authService: AuthenticationService,
        private messageService: MessageService,
        private router: Router) {

    }

    ngOnInit() {
        this.dataSource = {};
        this.registerForm = this.fb.group({
            username: ['', [<any>Validators.required]],
            email: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]],
        });

    }

    register() {
        if (this.registerForm.invalid) {
            this.messageService.warning('Dados incompletos');
            return;
        }

        this.authService.insertUser(this.dataSource).subscribe(
            (result: any) => {
                this.messageService.success('Salvo com sucesso!');
                this.router.navigate(['/login']);
            },
            (error) => {
                console.log(error);
                this.messageService.error('Erro!' + error.error.errmsg);
            });

    }

}