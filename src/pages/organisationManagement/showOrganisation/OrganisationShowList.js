import React from 'react';
import { CustomCollapseCard } from '../../../components';

const OrganisationShowList = ({ organisation }) => {
  return (
    <CustomCollapseCard cardTitle="Kurum Görüntüleme">
      <div>
        <ul className="list">
          <li>
            Kurum Adı: <span>{organisation?.name}</span>
          </li>
          <li>
            Kurum Türü: <span>{organisation?.organisationType?.name}</span>
          </li>
          <li>
            Kurum Yöneticisi: <span>{organisation?.name}???</span>
          </li>
          <li>
            Müşteri Numarası: <span>{organisation?.customerNumber}</span>
          </li>
          <li>
            Müşteri Yöneticisi: <span>{organisation?.customerManager}</span>
          </li>
          <li>
            Segment Bilgisi: <span>{organisation?.name}???</span>
          </li>
          <li>
            Şehir: <span>{organisation?.name}???</span>
          </li>
          <li>
            İlçe: <span>{organisation?.name}???</span>
          </li>
          <li>
            Kurum Adresi: <span>{organisation?.organisationAddress}</span>
          </li>
          <li>
            Kurum Kontakt Kişi: <span>{organisation?.contactName}</span>
          </li>
          <li>
            Kurum Kontakt Mail: <span>{organisation?.contactMail}</span>
          </li>
          <li>
            Kurum Kontakt Telefon: <span>{organisation?.contactPhone}</span>
          </li>
        </ul>
      </div>
    </CustomCollapseCard>
  );
};

export default OrganisationShowList;
