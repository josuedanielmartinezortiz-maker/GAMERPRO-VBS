// =====================================================
// 🧠 GAMERPRO VBS — CEREBRO V0.1
// =====================================================

const ACCIONES = Object.freeze({
    COMER: "COMER",
    BEBER: "BEBER",
    DESCANSAR: "DESCANSAR",
    EXPLORAR: "EXPLORAR",
    HUIR: "HUIR",
    OBSERVAR: "OBSERVAR"
});

function limitar(valor, minimo = 0, maximo = 1) {
    return Math.max(minimo, Math.min(maximo, valor));
}

// -----------------------------------------------------
// 🧠 CEREBRO
// -----------------------------------------------------

export function crearCerebro() {

    const memoria = [];

    function pensar(sensores, estado) {

        const hambre = limitar(estado.hambre);
        const sed = limitar(estado.sed);
        const energia = limitar(estado.energia);
        const miedo = limitar(estado.miedo);
        const curiosidad = limitar(estado.curiosidad);

        const peligro = limitar(sensores.peligro);
        const comida = limitar(sensores.comida);
        const agua = limitar(sensores.agua);

        // ---------------------------------------------
        // PRIORIDAD: PELIGRO
        // ---------------------------------------------

        if (miedo > 0.75 || peligro > 0.85) {
            return registrarDecision(
                ACCIONES.HUIR,
                sensores,
                estado
            );
        }

        // ---------------------------------------------
        // NECESIDADES BÁSICAS
        // ---------------------------------------------

        if (sed > 0.75 && agua > 0.3) {
            return registrarDecision(
                ACCIONES.BEBER,
                sensores,
                estado
            );
        }

        if (hambre > 0.75 && comida > 0.3) {
            return registrarDecision(
                ACCIONES.COMER,
                sensores,
                estado
            );
        }

        // ---------------------------------------------
        // POCA ENERGÍA
        // ---------------------------------------------

        if (energia < 0.2) {
            return registrarDecision(
                ACCIONES.DESCANSAR,
                sensores,
                estado
            );
        }

        // ---------------------------------------------
        // EXPLORACIÓN
        // ---------------------------------------------

        if (curiosidad > 0.65) {
            return registrarDecision(
                ACCIONES.EXPLORAR,
                sensores,
                estado
            );
        }

        // ---------------------------------------------
        // COMPORTAMIENTO TRANQUILO
        // ---------------------------------------------

        return registrarDecision(
            ACCIONES.OBSERVAR,
            sensores,
            estado
        );
    }

    function registrarDecision(accion, sensores, estado) {

        const recuerdo = {
            accion,
            tiempo: Date.now(),

            sensores: {
                peligro: limitar(sensores.peligro),
                comida: limitar(sensores.comida),
                agua: limitar(sensores.agua)
            },

            estado: {
                hambre: limitar(estado.hambre),
                sed: limitar(estado.sed),
                energia: limitar(estado.energia),
                miedo: limitar(estado.miedo),
                curiosidad: limitar(estado.curiosidad)
            }
        };

        memoria.push(recuerdo);

        // Conservamos solamente los últimos 20 recuerdos.
        if (memoria.length > 20) {
            memoria.shift();
        }

        return {
            accion,
            memoria: [...memoria]
        };
    }

    function obtenerMemoria() {
        return [...memoria];
    }

    function borrarMemoria() {
        memoria.length = 0;
    }

    return {
        pensar,
        obtenerMemoria,
        borrarMemoria,
        acciones: ACCIONES
    };
    }
