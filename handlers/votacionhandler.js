const conexion = require('../servicios/ServicioMySQL');
const hashServ = require('../servicios/SHA512');
let votacionhandler ={
    votarActividad:function (nombresala,nombreActividad,voto){
        return new Promise( (resolve, reject) =>{
                try {
                    let con = conexion.ObtenerConexion("proyectoback");
                    con.connect();
                    let consulta = `INSERT INTO votacion(actividad, voto, nombresala) VALUES ('${nombreActividad}', ${voto}, '${nombresala}');`;
                    con.query(consulta);
                    resolve({message: `La actividad ${nombreActividad}, se valoro con éxito.`});
                }catch (e) {
                    reject(e);
                }
            }
        )
    },
    obtenerVotosporSala:function(nombreSala){
        new Promise ((resolve, reject)=>{
            try{
                let con = conexion.ObtenerConexion("proyectoback");
                con.connect();
                let consulta = `SELECT JSON_ARRAYAGG(JSON_OBJECT(
                    'nombreactividad', actividad,
                    'votos1', SUM(CASE WHEN voto = 1 THEN 1 ELSE 0 END),
                    'votosmenos1', SUM(CASE WHEN voto = -1 THEN 1 ELSE 0 END),
                    'votos0', SUM(CASE WHEN voto = 0 THEN 1 ELSE 0 END),
                    'totalvotos', SUM(voto)
                )) AS response
                FROM votacion
                WHERE nombresala = '${nombreSala}'
                GROUP BY actividad; `;
                con.query(consulta, (bad, ok)=>{
                     if(bad){

                     } else{
                        try{
                            resolve(JSON.parse(results[0].response));
                        }catch(error){
                            reject(error);
                        }
                     } 
                });

            }catch(error){
                reject(error);
            }
        });
    }
}
module.exports = votacionhandler;






