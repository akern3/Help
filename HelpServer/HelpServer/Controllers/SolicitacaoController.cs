﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelpServer.Models;
using HelpServer.Context;
using System.Data.Entity.Validation;
using HelpServer.Repositorios;

namespace HelpServer.Controllers
{
    public class SolicitacaoController : ApiController
    {


        static readonly ISolicitacaoRepository repositorio = new SolicitacaoRepository();


        // GET: api/Solicitacao
        public IEnumerable <Solicitacao> Get()
        {
            try
            {

                return repositorio.GetAll();

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound); ;
            }
        }

        // GET: api/Solicitacao/5
        public Solicitacao Get(long id)
        {
            Solicitacao item = repositorio.Get(id);
            if (item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return item;
        }

        // POST: api/Solicitacao
        public HttpResponseMessage Post([FromBody]Solicitacao value)
        {

            try
            {
                value = repositorio.Add(value);

                var response = Request.CreateResponse<Solicitacao>(HttpStatusCode.Created, value);

                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
            

        }

        [Route("api/Solicitacao/AlterarStatus/{id}")]
        public HttpResponseMessage PatchAlterarStatusSolicitacao(long id, [FromBody]int status)
        {
           return repositorio.UpdateStatus(id, status)? Request.CreateResponse<int>(HttpStatusCode.OK, status) : Request.CreateResponse<int>(HttpStatusCode.BadRequest, status);
           
        }

        [Route("api/Solicitacao/AlterarResponsavel/{id}")]
        public HttpResponseMessage PatchAlterarResponsavelSolicitacao(long id, [FromBody]string responsavel)
        {
            return repositorio.AlterarResponsavel(id, responsavel)? Request.CreateResponse<string>(HttpStatusCode.OK, responsavel) : Request.CreateResponse<string>(HttpStatusCode.BadRequest, responsavel);

        }


        // PUT: api/Solicitacao/5
        public void Put(long id, [FromBody]Solicitacao value)
        {

            repositorio.Update(id,value);

        }

        // DELETE: api/Solicitacao/5
        public void Delete(long id)
        {

            Solicitacao item = repositorio.Get(id);
            if (item == null)
            {                                                                                                                     
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            repositorio.Remove(item);
        }
    }
}