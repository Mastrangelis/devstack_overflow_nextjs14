export async function getAllCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,cca2',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return { countries: [] };
  }

  const countriesTransformed = data.reduce((acc, country) => {
    acc.push({
      name: country.name.common,
      flag: country.flags.png,
      cca2: country.cca2,
    });

    return acc;
  }, []);

  return { countries: countriesTransformed };
}

export async function getCountryFlagByCode(code: string) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=flags`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch country flag');
  }

  const data = await response.json();

  if (!data || !data.flags || !data.flags.svg) {
    return '';
  }

  return data.flags.svg;
}
