import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CnpjvalidacaoProvider {

  constructor(public http: HttpClient) {
  }

  callServiceCNPJ(cnpj: String): any {
    return this.http.get(`https://www.receitaws.com.br/v1/cnpj/` + cnpj);
  }
}
