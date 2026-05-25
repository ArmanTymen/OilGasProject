import { useState } from "react";
import { useGetWellDataQuery } from "@/entities/well/api/wellApi";
import { useNavigate } from "react-router-dom";
import s from "./FieldMap2D.module.css";

export const FieldMap2D = () => {
  const { data, isLoading } = useGetWellDataQuery();
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const navigate = useNavigate();

  if (isLoading) return <div className={s.loader}>Загрузка данных...</div>;

  const selectedField = data?.find(f => f.id === selectedFieldId);
  const selectedCluster = selectedField?.clusters.find(c => c.id === selectedClusterId);

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <select 
          className={s.select}
          onChange={(e) => {
            setSelectedFieldId(Number(e.target.value));
            setSelectedClusterId(null);
          }}
        >
          <option value="">Выберите месторождение</option>
          {data?.map(field => (
            <option value={field.id} key={field.id}>{field.field}</option>
          ))}
        </select>

        <select 
          className={s.select}
          disabled={!selectedFieldId} 
          onChange={(e) => setSelectedClusterId(Number(e.target.value))}
        >
          <option value="">Выберите куст</option>
          {selectedField?.clusters.map(cluster => (
            <option value={cluster.id} key={cluster.id}>{cluster.cluster}</option>
          ))}
        </select>
      </div>

      <div className={s.grid}>
        {!selectedClusterId && <p className={s.placeholder}>Выберите куст, чтобы увидеть скважины</p>}
        
        {selectedCluster?.wells.map(well => (
          <div 
            key={well.id}
            className={s.wellCard}
            onClick={() => navigate(`/model/${well.well}`)}
          >
            <strong>{well.well}</strong>
            <div className={s.wellInfo}>
              P: {well.pressure} | T: {well.temperature}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};