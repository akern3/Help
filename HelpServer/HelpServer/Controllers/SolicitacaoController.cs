using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HelpServer.Models;
using HelpServer.Context;
using System.Data.Entity.Validation;
using HelpServer.Repositorios;
using System.Web.Http.Cors;

namespace HelpServer.Controllers
{
    public class SolicitacaoController : ApiController
    {


        static readonly SolicitacaoRepository repositorio = new SolicitacaoRepository();


        // GET: api/Solicitacao
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Solicitacao> Get()
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Solicitacao/AlterarStatus/{id}")]
        public HttpResponseMessage PatchAlterarStatusSolicitacao(long id, [FromBody]int status)
        {
            return repositorio.UpdateStatus(id, status) ? Request.CreateResponse<int>(HttpStatusCode.OK, status) : Request.CreateResponse<int>(HttpStatusCode.BadRequest, status);

        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Solicitacao/AlterarResponsavel/{id}")]
        public HttpResponseMessage PatchAlterarResponsavelSolicitacao(long id, [FromBody]string responsavel)
        {
            return repositorio.AlterarResponsavel(id, responsavel) ? Request.CreateResponse<string>(HttpStatusCode.OK, responsavel) : Request.CreateResponse<string>(HttpStatusCode.BadRequest, responsavel);

        }


        // PUT: api/Solicitacao/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Put([FromBody]Solicitacao value)
        {

            repositorio.Update(value);

        }

        // DELETE: api/Solicitacao/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Delete(long id)
        {

            Solicitacao item = repositorio.Get(id);
            if (item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            repositorio.Remove(item);
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public EstatisticasSolicitacoes GetEstatisticas()
        {
            try
            {
                EstatisticasSolicitacoes estatisticas = new EstatisticasSolicitacoes();
                {
                    estatisticas.CriticidadeAlta = repositorio.GetAll().Where(x => x.criticidade == Enumerations.Criticidade.Alta).Count();
                    estatisticas.CriticidadeMedia = repositorio.GetAll().Where(x => x.criticidade == Enumerations.Criticidade.Media).Count();
                    estatisticas.CriticidadeBaixa = repositorio.GetAll().Where(x => x.criticidade == Enumerations.Criticidade.Baixa).Count();
                    estatisticas.StatusEmAberto = repositorio.GetAll().Where(x => x.status == Enumerations.Status.EmAberto).Count();
                    estatisticas.StatusEmAnalise = repositorio.GetAll().Where(x => x.status == Enumerations.Status.EmAnalise).Count();
                    estatisticas.StatusEncerrado = repositorio.GetAll().Where(x => x.status == Enumerations.Status.Encerrada).Count();
                    estatisticas.SolicitacoesSetorLaboratorio = repositorio.GetAll().Where(x => x.setor == Enumerations.Setor.Laboratorio).Count();
                    estatisticas.SolicitacosSetorSalaDeAula = repositorio.GetAll().Where(x => x.setor == Enumerations.Setor.SalaDeAula).Count();
                }
                return estatisticas;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }


        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public EstatisticasSolicitacoes GetEstatisticasPorResponsavel(string idResponsavel)
        {
            try
            {
                EstatisticasSolicitacoes estatisticas = new EstatisticasSolicitacoes();
                {
                    estatisticas.CriticidadeAlta = repositorio.GetAll().Where(x => (x.criticidade == Enumerations.Criticidade.Alta) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.CriticidadeMedia = repositorio.GetAll().Where(x => (x.criticidade == Enumerations.Criticidade.Media) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.CriticidadeBaixa = repositorio.GetAll().Where(x => (x.criticidade == Enumerations.Criticidade.Baixa) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.StatusEmAberto = repositorio.GetAll().Where(x => (x.status == Enumerations.Status.EmAberto) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.StatusEmAnalise = repositorio.GetAll().Where(x => (x.status == Enumerations.Status.EmAnalise) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.StatusEncerrado = repositorio.GetAll().Where(x => (x.status == Enumerations.Status.Encerrada) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.SolicitacoesSetorLaboratorio = repositorio.GetAll().Where(x => (x.setor == Enumerations.Setor.Laboratorio) && (x.IdResponsavel == idResponsavel)).Count();
                    estatisticas.SolicitacosSetorSalaDeAula = repositorio.GetAll().Where(x => (x.setor == Enumerations.Setor.SalaDeAula) && (x.IdResponsavel == idResponsavel)).Count();
                }
                return estatisticas;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
