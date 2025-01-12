export class SimuladorController {
    constructor({ simuladorModelo }) {
        this.simuladorModelo = simuladorModelo;
    }

    cambiarEstado4 = async (req, res) => {
        try {
            const result = await this.simuladorModelo.cambiarEstado({ id_estado: 4, descripcion: "Cancelado" });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    cambiarEstado5 = async (req, res) => {
        try {
            const result = await this.simuladorModelo.cambiarEstado({ id_estado: 5, descripcion: "Completado" });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
